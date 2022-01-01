import PageContainer from "../../sharable/page-container";
import Stocks from "./components/stock";
export default function Dashboard() {
    return (
        <PageContainer pageTitle="Dashboard">
            <Stocks />
        </PageContainer>
    );
}
