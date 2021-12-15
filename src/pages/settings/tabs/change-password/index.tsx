import { useForm } from "react-hook-form";
import FormGroup from "../../../../sharable/form-group";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormHelperText,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";
import InputController from "../../../../sharable/input-controller";
import request from "../../../../utils/request";
import cogoToast from "cogo-toast";
interface IPasswordState {
    password1: string;
    password2: string;
}
export default function ChangePassword() {
    const { handleSubmit, control, formState, reset, getValues } = useForm({
        defaultValues: { password1: "", password2: "" },
    });
    const { errors, isSubmitting } = formState;
    // const [createSeed, { isLoading }] = useCreateSeedMutation();
    const onSubmit = async (data: IPasswordState) => {
        if (isSubmitting) {
            return;
        }
        console.log(data);
        if (data.password1 !== data.password2) {
            return;
        }
        try {
            await request({ method: "POST", url: "/api/private/v1/user/change-passsword", data });
            reset();
        } catch (err) {}
    };

    return (
        <Card variant="outlined" sx={{ maxWidth: "600px", margin: "auto" }}>
            <CardHeader subheader="Change login password" />
            <CardContent>
                <Box mb={4}>
                    <Typography gutterBottom>Password must be atleast 8 characters long</Typography>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <InputController
                            label="Enter New Password"
                            required
                            control={control}
                            name="password1"
                            type="text"
                            error={!!errors.password1}
                            helperText={errors.password1?.message}
                            inputProps={{ maxLength: 100, minLength: 8 }}
                            id="password1"
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputController
                            label="Confirm password"
                            required
                            control={control}
                            name="password2"
                            type="text"
                            error={!!errors.password2}
                            helperText={errors.password2?.message}
                            inputProps={{ maxLength: 100, minLength: 8 }}
                            id="password2"
                        />
                        {getValues().password1 !== getValues().password2 && (
                            <FormHelperText error>Passwords do not match</FormHelperText>
                        )}
                    </FormGroup>
                    <Button
                        endIcon={isSubmitting ? <CircularProgress color="inherit" size={20} thickness={6} /> : null}
                        disabled={isSubmitting}
                        type="submit"
                        disableElevation
                        variant="contained"
                        color="primary"
                    >
                        Change Password
                        {isSubmitting ? "..." : ""}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
