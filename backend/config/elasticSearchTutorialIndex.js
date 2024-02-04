const client = require("./elasticSearchConfig");

async function createTutorialIndex() {
  const indexName = "tutorials";

  try {
    // check if the index already exists
    const indexExists = await client.indices.exists({ index: indexName });
    if (indexExists) {
      console.log(`Index ${indexName} already exists. Skipping this part.`);
      return;
    }

    // create an index with the extended mapping for tutorials
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            id: { type: "keyword" },
            title: { type: "text" },
            description: { type: "text" },
            author: { type: "keyword" },
            comments: {
              type: "nested",
              properties: {
                commenter: { type: "keyword" },
                comment_text: { type: "text" },
                comment_date: { type: "date" },
              },
            },
          },
        },
      },
    });

    console.log(`Index ${indexName} created with the extended mapping`);
  } catch (error) {
    console.error("Error creating the index:", error);
  }
}

module.exports = createTutorialIndex;
