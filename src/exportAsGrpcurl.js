export default function copyGrpcurlToClipboard(selectedServer, selectedService, selectedMethod, metaData, requestText) {
	var {name, port} = selectedServer;
	var alertMessage="name=" + name + ", port=" + port;// + ", service=" + selectedService.name + ", method=" + selectedMethod.name + ", metadata=" + JSON.stringify(metaData) + ", requestText=" + requestText;
	var grpcurl = `grpcurl -H '${JSON.stringify(metaData)}' -plaintext -d '${requestText}' ${name}:${port} ${selectedService.name}/${selectedMethod.name}`;
	var el = document.createElement('textarea');
	el.value = grpcurl;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	alert("gRPCurl command has been copied to clipboard: \n\n" + grpcurl);
}