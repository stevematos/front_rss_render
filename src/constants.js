export const CONFIG = {
    urlApi: 'http://0.0.0.0:8000',
}
export const queries = {
    login: (email, password) => `{
          login(email: "${email}",password:"${password}")
     }`,
    getFeedsByUser: (user) => `{
			getFeedsByUser(
				userId: ${user}
			){
                title
                id
            }
    }`,
    feed: (rssId) => `{
        feed(
            rssId: ${rssId}
        ) {
            title
            summary
            published
            image
            author
            link
        }
    }`
}

export const mutations = {
    subscribeFeed: (url, user, title) => `mutation {
          SubscribeFeed(
            urlFeed: "${url}",
            userId: ${user},
            title:"${title}"){
            idRss
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
