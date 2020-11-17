import axios from 'axios';

export const getProjects = async (user) => {
    try {
        // https://api.github.com/${user}/enzzoperez/repos
        if(!user) throw Error('No user found')
        const res = await axios.get(`https://api.github.com/users/${user}/repos`)
        return res.data
    } catch (error) {
        console.log('ERROR IN API', error)
        return error.message
    }
}

export const getDetailRepo = async (userName, repoName) => {
    try {
        const res = await axios.get(`https://api.github.com/repos/${userName}/${repoName}`)
        return res.data
    } catch (error) {
        console.log('ERROR IN DETAIL API', error)
        return error.message
    }
}