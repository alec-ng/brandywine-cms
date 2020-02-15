/**
 * Utility methods to help generate a chronological ordering of posts
 */

/**
 * Given a chosenKey that exists in treeData, returns back two arrays - initially selected
 * key comprising of just the chosenkey, and expandedKeys that open all sub nodes leading up to
 * the chosen key
 * treeData is an array of the form returned by createTreeData()
 */
export function getInitialKeys(chosenNode, treeData) {
  let initialSelectedKeys = [];
  let initialExpandedKeys = [];
  let returnVal = [initialSelectedKeys, initialExpandedKeys];

  if (!chosenNode || !treeData) {
    return returnVal;
  }

  // node key, format: ${year}-${month}-${day}-${dbId}
  const [year, month] = chosenNode.split("-");
  let yearNode = treeData.find(node => node.key === `year-${year}`);
  if (!yearNode) {
    return returnVal;
  }
  let monthNode = yearNode.children.find(
    node => node.key === `month-${year}-${month}`
  );
  if (!monthNode) {
    return returnVal;
  }
  initialSelectedKeys.push(`post-${chosenNode}`);
  initialExpandedKeys.push(yearNode.key);
  initialExpandedKeys.push(monthNode.key);
  return returnVal;
}

/**
 * From an array of posts, returns an array of node objects to be used as treeData
 * for the rc-tree component
 */
export function createTreeData(data) {
  // Group all data by yyyy, mm, dd
  let keyData = getGroupedPostData(data);
  let treeData = [];

  function reverse(a, b) {
    return b - a;
  }

  // iteratively put all grouped data in an array, where days are grouped subchildren of its respective
  // month, which are in term grouped subchildren of its respective year
  let sortedYears = Object.keys(keyData).sort(reverse);
  sortedYears.forEach(year => {
    let months = [];
    let yearNode = {
      key: `year-${year}`,
      title: year.toString(),
      children: months
    };

    let sortedMonths = Object.keys(keyData[year]).sort(reverse);
    sortedMonths.forEach(month => {
      let posts = [];
      let monthNode = {
        key: `month-${year}-${month}`,
        title: monthMap[month],
        children: posts
      };

      let sortedDays = Object.keys(keyData[year][month]).sort(reverse);
      sortedDays.forEach(day => {
        keyData[year][month][day].forEach(post => {
          let postNode = {
            key: post.key,
            title: post.title,
            children: []
          };
          posts.push(postNode);
        });
      });

      months.push(monthNode);
    });

    treeData.push(yearNode);
  });

  return treeData;
}

// groups all posts by year, then by each year's month, then by each month's date
function getGroupedPostData(data) {
  let keyData = {}; // yy -> {mm -> {post}}
  Object.keys(data).forEach(id => {
    let post = data[id].post;
    let [year, month, day] = post.date.split("-"); // yyyy-mm-dd
    if (!keyData[year]) {
      keyData[year] = {};
    }
    if (!keyData[year][month]) {
      keyData[year][month] = {};
    }
    if (!keyData[year][month][day]) {
      keyData[year][month][day] = [];
    }
    keyData[year][month][day].push({
      title: post.title,
      key: id
    });
  });
  return keyData;
}

const monthMap = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
};
