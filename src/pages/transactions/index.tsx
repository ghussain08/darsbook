// react functional component
import React, { useCallback, useEffect } from "react";
import PageContainer from "../../sharable/page-container";
import { billApi } from "../../app/features/bill";
import Loader from "../../sharable/loader";
import { Box, Button } from "@mui/material";
import { ArrowRight, AddCircleRounded } from "@mui/icons-material";
import BillCard from "./component/bill-card";
import Empty from "../../sharable/empty";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Error from "../../sharable/error";
import { getQueryParams } from "../../utils/common";
import BillFilters from "./component/bill-filters";

export default function Bills() {
    const [trigger, result] = billApi.useLazyGetBillsQuery();
    // const [filters, setFilters] = useState<Partial<IBillFilters>>({ nextCursor: null });

    const { isError, isFetching, isLoading, data } = result;

    // should show next page button
    const showLoadMore = data?.meta.nextCursor;
    const bills = data?.data;

    // use url query param for next and prev pagination
    const history = useHistory();

    const getTransactions = useCallback(() => {
        trigger({ ...getQueryParams() }, true);
    }, [trigger]);

    // handle url change, if url changes then refetch the data
    useEffect(() => {
        const unlistened = history.listen((data) => {
            getTransactions();
        });
        return () => unlistened();
    }, [getTransactions, history]);

    // handle initial mount
    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

    return (
        <PageContainer pageTitle="Transactions">
            <BillFilters />
            <Box>
                {bills?.map((bill) => (
                    <BillCard bill={bill} key={bill.orderId} />
                ))}
            </Box>

            <Loader isOpen={isFetching || isLoading} message="Fetching transactions...please wait" />

            <Error isOpen={isError} onRetry={() => getTransactions()} />

            {!isError && !isFetching && !isLoading && bills?.length === 0 && (
                <Box textAlign={"center"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                    <Empty isOpen={true} message="No bills found, why not create some?" />
                    <Button
                        endIcon={<AddCircleRounded />}
                        sx={{ mt: 2 }}
                        variant="contained"
                        component={RouterLink}
                        to="/new-bill"
                    >
                        Add New Bill
                    </Button>
                </Box>
            )}

            {showLoadMore && isError === false && (
                <Box mb={2} textAlign={"center"}>
                    <Button
                        component={RouterLink}
                        to={`/transactions?nextCursor=${showLoadMore}`}
                        endIcon={<ArrowRight />}
                        disableElevation
                        disabled={isFetching || isLoading}
                        color="secondary"
                        variant="contained"
                    >
                        Next
                    </Button>
                </Box>
            )}
        </PageContainer>
    );
}
