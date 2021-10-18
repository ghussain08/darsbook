import React, { ReactNode } from "react";
import { Container, Box, Typography, Button, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputController from "../../sharable/input-controller";
import FormGroup from "../../sharable/form-group";
import { Link as ReactRouter } from "react-router-dom";
import loginSchema from "./form.schema";
export default function Login(): ReactNode {
  const { register, control, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const onSubmit = (data: any) => {
    console.log("called");
    console.log(data);
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100VH",
      }}
    >
      <Box
        p={{ xs: 2, sm: 4 }}
        borderRadius="5px"
        width="100%"
        bgcolor="#f6f6f6"
      >
        <Typography
          gutterBottom
          textAlign="center"
          variant="h4"
          fontWeight="bold"
          color="primary"
          mb={6}
        >
          Login to DarsBooke
        </Typography>
        <Typography mb={4} gutterBottom color="inherit">
          Manage your entire business record simply
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <FormGroup>
            <InputController
              autoComplete="email"
              control={control}
              label="Email"
              name="email"
              required
            />
          </FormGroup>

          <FormGroup>
            <InputController
              autoComplete="password"
              control={control}
              label="Password"
              name="password"
              type="password"
              required
            />
          </FormGroup>
          <Typography>
            <Link color="inherit" component={ReactRouter} to="/">
              Forgot password?
            </Link>
          </Typography>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disableElevation
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
