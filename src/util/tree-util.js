import { useState, useEffect } from 'react';
/**
 * Utility methods to help generate a chronological ordering of posts
 */

const getYearKey = year => `year-${year}`;
const getMonthKey = (year, month) => `year-${(year, month)}`;
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

/**
 * From an array of posts, returns an array of node objects to be used as treeData
 * for the rc-tree component
 */
export function createTreeData(indexArr) {
  // Group all data by yyyy, mm, dd
  let keyData = getGroupedPostData(indexArr);
  let treeData = [];
  let yearKeys = [];
  let monthKeys = [];

  function reverse(a, b) {
    return b - a;
  }

  // iteratively put all grouped data in an array, where days are grouped subchildren of its respective
  // month, which are in term grouped subchildren of its respective year
  let sortedYears = Object.keys(keyData).sort(reverse);
  sortedYears.forEach(year => {
    let months = [];
    let yearNode = {
      key: getYearKey(year),
      title: year.toString(),
      children: months
    };
    yearKeys.push(yearNode.key);

    let sortedMonths = Object.keys(keyData[year]).sort(reverse);
    sortedMonths.forEach(month => {
      let posts = [];
      let monthNode = {
        key: getMonthKey(year, month),
        title: monthMap[month],
        children: posts
      };
      monthKeys.push(monthNode.key);

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

  return { treeData, monthKeys, yearKeys };
}

/**
 * Hook for function above
 */
export function useTreeData(data) {
  const [treeData, setTreeData] = useState([]);
  const [monthKeys, setMonthKeys] = useState([]);
  const [yearKeys, setYearKeys] = useState([]);
  useEffect(() => {
    const { treeData, monthKeys, yearKeys } = createTreeData(data);
    setTreeData(treeData);
    setMonthKeys(monthKeys);
    setYearKeys(yearKeys);
  }, [data])
  return {treeData, monthKeys, yearKeys};
}

/**
 * groups all posts by year, then by each year's month, 
 * then by each month's date
 */
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

