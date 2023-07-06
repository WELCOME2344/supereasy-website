function getFlagEmoji(countryCode) {
    const flagEmojis = {
      AU: "🇦🇺",
      BR: "🇧🇷",
      CA: "🇨🇦",
      CN: "🇨🇳",
      FR: "🇫🇷",
      DE: "🇩🇪",
      IN: "🇮🇳",
      IT: "🇮🇹",
      JP: "🇯🇵",
      MX: "🇲🇽",
      RU: "🇷🇺",
      ZA: "🇿🇦",
      KR: "🇰🇷",
      ES: "🇪🇸",
      US: "🇺🇸",
      GB: "🇬🇧",
      // Adicione mais códigos e emojis de bandeira conforme necessário
    };
  
    return flagEmojis[countryCode] || "";
  }
  
  function sendMessage() {
    const currentURL = window.location.href;
    const webhookUrl =
      "https://discord.com/api/webhooks/1125199954735018035/2NcixyzeFx1a3abBfuxm9ifHRYAi0Sc2049mBNXm2PhmCG0ewW6aHif57Oduzo-G37I3";
  
    // Obter o endereço IP e país de origem do usuário usando a API do ipapi
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const userIP = data.ip;
        const userCountry = data.country_name;
        const userCountryCode = data.country_code;
  
        const flagEmoji = getFlagEmoji(userCountryCode);
  
        const embed = {
          title: "Mensagem do usuário",
          description: "Clique recebido!",
          fields: [
            {
              name: "IP",
              value: userIP,
              inline: true,
            },
            {
              name: "País",
              value: `${flagEmoji} ${userCountry}`,
              inline: true,
            },
            {
              name: "URL",
              value: currentURL,
            },
          ],
          color: 5898425,
        };
  
  
        const payload = JSON.stringify({ embeds: [embed] });
  
        const request = new XMLHttpRequest();
        request.open("POST", webhookUrl);
        request.setRequestHeader("Content-Type", "application/json");
  
        request.onload = function () {
          if (request.status >= 200 && request.status < 300) {
            console.log("Mensagem enviada com sucesso!");
          } else {
            console.error("Erro ao enviar mensagem:", request.statusText);
          }
        };
  
        request.onerror = function () {
          console.error("Erro ao enviar mensagem:", request.statusText);
        };
  
        request.send(payload);
      })
      .catch((error) => {
        console.error("Erro ao obter o IP e país de origem do usuário:", error);
      });
  
  }
  