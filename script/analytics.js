async function sendData(data) {
    const rawData = JSON.stringify(data);
    
    console.info(rawData)

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer af312d2b769a633db7092ca1fa1c8235c07f07cd0399d2d3bfa931ac893551244e04801177e3b29f8ff256af264dad2135be75bc76b8a4156402e6d328cfac8e1c3f17d218ca43813b7402d502e7df9ec8cd85bee713de3523968bdc5d253b39b68af9df8842205f771a36650c15d561a8d6b8826cd3484ca8ff3cecc2f75ecf"
        },
        body: rawData,
    };

    try {
        await fetch("https://odevzdavani.tourdeapp.cz/fishbush/api/amos-game-statistics", requestOptions);
        console.info("Analytics sent successfully.");
    } catch (error) {
        console.error("Failed to send analytics:", error);
    }
}
