import React, { ReactNode } from "react";

type UploaderProps = {
    children?: ReactNode,
    onFileSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export default function Uploader(props: UploaderProps) {
    return (
        <input
            type="file"
            id="file"
            className="input-file"
            accept=".xlsx"
            onChange={props.onFileSubmit}
        />
    );
}
