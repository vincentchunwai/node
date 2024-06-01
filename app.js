const fastify = require('fastify')();
const { printBarcode } = require('./printer');

fastify.post('/print/:code', async (request, reply) => {
  const { code } = request.params;
  if (code.length != 11){
    reply.code(400).send({error: `barcode is not 11 digits`});
    return;
  }
  try {
    const result = await printBarcode(code);
    reply.code(200).send({ message: result });
  } catch (error) {
    reply.code(500).send({ error: `Failed to print barcode: ${error.message}` });
  }
});

const start = async () => {
  try {
    await fastify.listen(3000);
    console.log(`Server listening on http://localhost:3000`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
