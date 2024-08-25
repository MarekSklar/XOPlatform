async function sendData(data) {
    const rawData = JSON.stringify(data);

    const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: rawData,
        redirect: "follow"
    };

    try {
        await fetch("http://localhost:6825", requestOptions);
    } catch (error) {
        console.error("Failed to send analytics.");
    }
}