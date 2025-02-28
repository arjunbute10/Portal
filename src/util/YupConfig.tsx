import { addMethod, string } from 'yup';

type YupConfigProp = {
    children?: React.ReactNode;
}

export default function YupConfig({ children }: YupConfigProp) {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    addMethod(string, 'phoneNo', function phoneNo() {
        return this.matches(phoneRegExp, 'Mobile Number is not valid');
    });

    return <>{children}</>;
}