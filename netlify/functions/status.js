exports.handler = async function () {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      ok: true,
      mensagem: "Backend funcionando",
      data: new Date().toISOString()
    })
  };
};

