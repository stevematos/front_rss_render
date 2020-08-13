export var CONFIG = {
    urlApi: 'http://0.0.0.0:8000',
}
export var queries = {
    login: (email, password) => `{
          login(email: "${email}",password:"${password}")
     }`,
    getFeedsByUser: (user) => `{
			getFeedsByUser(
				userId: ${user}
			){
                title
                urlRss
            }
    }`,
    feed: (urlRss) => `{
        feed(
            url: "${urlRss}"
        ) {
            title
            summary
            published
            image
            author
        }
    }`
}

export var mutations = {
    subscribeFeed: (url, user, title) => `mutation {
          SubscribeFeed(
            urlFeed: "${url}",
            userId: ${user},
            title:"${title}"){
            idFeed
          }
    }`,
    createUser: (email, password) => `mutation {
          CreateUser(email: "${email}", password: "${password}"){
            user{
              id
            }
          }
    }`
}
