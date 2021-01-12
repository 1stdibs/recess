export default function copyGrpcUrlToClipboard(
    selectedServer,
    selectedService,
    selectedMethod,
    metaData,
    requestText
) {
    // trim whitespace at end of lines
    requestText = requestText?.replaceAll(/(?:[ \t]+)(\n)/g, '$1') || '';

    // format grpcurl one arg per line and read request from stdin so it can sit at
    // the end of the command without requiring a string literal
    const grpcurl = `grpcurl \\
\t-H '${JSON.stringify(metaData)}' \\
\t-plaintext \\
\t-d @ \\
\t${selectedServer?.name}:${selectedServer?.port} \\
\t${selectedService?.name}/${selectedMethod?.name} \\
<<EOM\n'${requestText}'\nEOM`;

    copyToClipboard(grpcurl);
    return grpcurl;
}

function copyToClipboard(copyText) {
    const textArea = document.createElement('textarea');
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}
