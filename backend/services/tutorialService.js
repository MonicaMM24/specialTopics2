const client = require("../config/elasticSearchConfig");

async function searchTutorials(searchText) {
  try {
    const result = await client.search({
      index: "tutorials",
      query: {
        match: {
          title: {
            query: searchText,
            fuzziness: "AUTO",
          },
        },
      },
    });

    return result.hits.hits.length > 0 ? result.hits.hits[0]._source : {};
  } catch (error) {
    console.error("Error in searchTutorials service:", error);
    throw error;
  }
}

async function addTutorial(tutorial) {
  try {
    const result = await client.index({
      index: "tutorials",
      body: tutorial,
    });

    return result.id;
  } catch (error) {
    console.error("Error in addTutorial service:", error);
    throw error;
  }
}

async function deleteTutorial(title) {
  try {
    let result;
      result = await client.search({
        index: "tutorials",
        body: {
          query: {
            bool: {
              must: [{ match: { title } }],
            },
          },
        },
      });

    const hits = result.hits.hits;

    if (hits.length === 0) {
      throw new Error("Tutorial not found.");
    }

    const tutorialId = hits[0]._id;
    await client.delete({ index: "tutorials", id: tutorialId });
  } catch (error) {
    console.error("Error in deleteTutorial", error);
    throw error;
  }
}

module.exports = {
  addTutorial,
  searchTutorials,
  deleteTutorial,
};
