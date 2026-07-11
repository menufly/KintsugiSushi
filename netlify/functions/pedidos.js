var pedidos = [];

function resposta(statusCode, dados) {
  return {
    statusCode: statusCode,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    },
    body: JSON.stringify(dados)
  };
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return resposta(200, { ok: true });
  }

  if (event.httpMethod === "GET") {
    return resposta(200, {
      ok: true,
      total: pedidos.length,
      pedidos: pedidos
    });
  }

  if (event.httpMethod === "POST") {
    var dados = JSON.parse(event.body || "{}");
    var pedido = {
      id: "PED-" + Date.now(),
      criadoEm: new Date().toISOString(),
      cliente: dados.cliente || "",
      telefone: dados.telefone || "",
      itens: dados.itens || [],
      total: dados.total || "",
      pagamento: dados.pagamento || "",
      endereco: dados.endereco || ""
    };

    pedidos.unshift(pedido);

    return resposta(201, {
      ok: true,
      mensagem: "Pedido recebido",
      pedido: pedido
    });
  }

  return resposta(405, {
    ok: false,
    erro: "Metodo nao permitido"
  });
};

