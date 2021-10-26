import React from 'react';
import styled from 'styled-components';
const FormGroupContainer = styled.div`
    margin-bottom: 24px;
`;
export default function FormGroup(props: { children: React.ReactNode }) {
    return <FormGroupContainer>{props.children}</FormGroupContainer>;
}
