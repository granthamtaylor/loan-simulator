import query from "./query";

class APIService {

  getRanking() {
    return query("GET", "table-ranking/");
  }

  getPortfolioValue() {
    return query("GET", "portfolio-value/");
  }

  getSwarmPlot() {
    return query("GET", "swarm-plot/");
  }

  getStats() {
    return query("GET", "basic-stats/");
  }  

  getUser(user) {
    return query("GET", `detail-user/?user=${user}`);
  }  

  getAnalytics(model, threshold) {
    return query("GET", `model-outcomes/?model=${model}&threshold=${threshold}`);
  }  

  getROC(model) {
    return query("GET", `auc-roc/?model=${model}`);
  }  

  getApplication() {
    return query('GET', `open-applications/`);
  }
  
  postReview(data) {
    return query("POST", `reviews/`, data);
  }

  getReviewHistory() {
    return query("GET", `review-history/`);
  }

}

export default new APIService();