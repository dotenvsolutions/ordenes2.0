export const VerificarUsuario = async ({ usuario }) => {
  // settimeout para simular una llamada a una api
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        usuario: usuario,
      });
    }, 1000);
  });
};
