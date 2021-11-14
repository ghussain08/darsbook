import InputController, { IControllerProps } from "../input-controller";
import { useGetUserSeedsQuery } from "../../app/features/seeds";
import { MenuItem, InputAdornment, CircularProgress } from "@mui/material";
export default function SeedDropdown(props: IControllerProps) {
    const { data, isFetching } = useGetUserSeedsQuery();
    const seeds = data?.seeds || [];
    return (
        <InputController
            InputProps={{
                endAdornment: isFetching ? (
                    <InputAdornment position="end">
                        <CircularProgress size={20} color="secondary" />
                    </InputAdornment>
                ) : null,
            }}
            select
            {...props}
        >
            {seeds.map((seed) =>
                seed.isActive ? (
                    <MenuItem key={seed.seedId} value={seed.seedId}>
                        {seed.seedName}
                    </MenuItem>
                ) : null
            )}
        </InputController>
    );
}
