const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const { printSchema } = require('graphql');
const { getGraphqlSchemaFromGrpc } = require('grpc-graphql-schema');

getGraphqlSchemaFromGrpc({
  endpoint: 'localhost:50051',
  protoFilePath: path.resolve(__dirname, 'grpc', 'proto', 'Example.proto'),
  serviceName: 'Example',
  packageName: 'io.xtech.example',
}).then((schema) => {
  console.log(printSchema(schema));
  const server = new GraphQLServer({
    schema,
  });
  server.start({
    port: 4000,
  }, () => console.log('server started on port 4000'));
});