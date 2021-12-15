export function formatGrpcUrl(
    selectedServer,
    selectedService,
    selectedMethod,
    metaData,
    requestText
) {
    // trim whitespace at end of lines
    requestText = requestText?.replaceAll(/(?:[ \t]+)(\n)/g, '$1') || '';

    var headers = '';
    for (const [key, value] of Object.entries(metaData)) {
        headers += `\t-H '${key}: ${value}' \\\n`
    }      

    // format grpcurl for ease of editing: one arg per line, read requestTest from
    // stdin to allow requestText arg placement at end of command
    const grpcurl = `grpcurl \\
${headers}\t-plaintext \\
\t-d @ \\
\t${selectedServer?.name}:${selectedServer?.port} \\
\t${selectedService?.name}/${selectedMethod?.name} \\
<<EOM\n${requestText}\nEOM`;

    return grpcurl;
}

export function copyToClipboard(copyText) {
    const textArea = document.createElement('textarea');
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}
