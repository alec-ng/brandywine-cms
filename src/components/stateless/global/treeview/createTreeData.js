/**
 * Given a list of CMSPosts, 
 * Returns an array of node objects to be used as treeData
 */
export function createTreeData(cmsPosts) {
  let keyData = getGroupedPostData(cmsPosts);
  let treeData = [];
  let yearKeys = [];
  let monthKeys = [];

  const descendingDateSort = (a, b) => b - a;
  const ascendingTitleSort = (a, b) => (a.title < b.title ? -1 : 1);

  // convert grouped data {yy -> {mm -> {dd -> [] }}} to tree nodes
  // and put in a sorted array by date descending
  let sortedYears = Object.keys(keyData).sort(descendingDateSort);
  sortedYears.forEach(year => {
    let months = [];
    let yearNode = {
      key: getYearKey(year),
      title: year.toString(),
      children: months
    };
    yearKeys.push(yearNode.key);

    let sortedMonths = Object.keys(keyData[year]).sort(descendingDateSort);
    sortedMonths.forEach(month => {
      let posts = [];
      let monthNode = {
        key: getMonthKey(year, month),
        title: monthMap[month],
        children: posts
      };
      monthKeys.push(monthNode.key);

      let sortedDays = Object.keys(keyData[year][month]).sort(descendingDateSort);
      sortedDays.forEach(day => {
        keyData[year][month][day].sort(ascendingTitleSort).forEach(post => {
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

  return { treeData, monthKeys, yearKeys };
}

/**
 * groups all posts by year, month, date
 * {yy -> {mm -> {dd -> [] }}}
 */
function getGroupedPostData(cmsPosts) {
  let keyData = {};
  
  cmsPosts.forEach(cmsPost => {
    const { date, postDataId, title } = cmsPost.post;
    let [year, month, day] = date.split("-"); // yyyy-mm-dd
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
      title: title,
      key: postDataId
    });
  });
  return keyData;
}

/**
 * Generate keys for year and month nodes
 */
const getYearKey = year => `year-${year}`;
const getMonthKey = (year, month) => `year-${(year, month)}`;

/*
 * mm -> labels
 */
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