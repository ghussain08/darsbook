import request from "../../utils/request";
import FullPageLoader from "../../sharable/fullpage-loader";
import { useEffect } from "react";
export default function Logout() {
    useEffect(() => {
        request({ method: "POST", url: "/api/private/v1/logout" }).finally(() => {
            localStorage.clear();
            window.location.href = "/login";
        });
    });
    return <FullPageLoader isOpen={true} message="Logging you out...please wait" />;
}
