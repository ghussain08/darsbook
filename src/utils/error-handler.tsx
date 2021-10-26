export default function errorHandler(err: any): string {
    if (!err) {
        return `Unknow error occurred, please try again`;
    }
    if (err && err.errors.length === 0) {
        return '';
    }
    if (Array.isArray(err.errors)) {
        return err.errors[0].msg;
    }
    return 'Unknow error occurred, please try again';
}
