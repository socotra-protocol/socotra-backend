export const graphConfig = () => ({
  graphUrl: {
    snapshot: process.env.SNAPSHOT_GRAPH_URL,
  },
  port: process.env.PORT,
});
