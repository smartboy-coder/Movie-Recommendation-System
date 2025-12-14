import useSWR from "swr";

const baseURL = 'https://api.themoviedb.org/3'
const params = 'api_key=c7bcfaf589024c0a81002dd112a1d6c5&language=en-US'

const detailFetcher = (url)=>fetch(url).then(r=>r.json())
const fetcher = (url)=>fetch(url).then(r=>r.json()).then(d=>d.results)
const genreFetcher = (url)=>fetch(url).then(r=>r.json()).then(d=>d.genres)
const castFetcher = (url)=>fetch(url).then(r=>r.json()).then(d=>d.cast)

export function useAllPopularMovies() {
     const pages = [1,2,3,4,5]
  const urls = pages.map(page => `${baseURL}/movie/popular?${params}&page=${page}`);
  const key = urls.join('|');
  
  return useSWR(key, async () => {
    const responses = await Promise.all(urls.map(url => fetcher(url)));
    return responses.flat();
  });
}

export function useTrendingMovies(){
    return useSWR(`${baseURL}/trending/movie/day?${params}&page=1`,fetcher)
}

export function useDetails(path,id){
    return useSWR(`${baseURL}/${path}/${id}?${params}&page=1`,detailFetcher)
}

export function useVideos(path,id){
     return useSWR(`${baseURL}/${path}/${id}/videos?${params}&page=1`,fetcher)
}

export function useGenres(){
     return useSWR(`${baseURL}/genre/movie/list?${params}&page=1`,genreFetcher)
}

export function usePopularMovies(page){
     return useSWR(`${baseURL}/movie/popular?${params}&page=${page}`,fetcher)
}

export function useCast(path,id){
     return useSWR(`${baseURL}/${path}/${id}/credits?${params}&page=1`,castFetcher)
}


export function useSimilar(path,id){
     return useSWR(`${baseURL}/${path}/${id}/similar?${params}&page=1`,fetcher)
}

export function useSearchMovies(route,query,page){
     return useSWR(`${baseURL}/search/${route}?${params}&query=${query}&page=${page}&include_adult=false`,detailFetcher)
}

export function useTopRatedMovies(route,category,page){
     return useSWR(`${baseURL}/${route}/${category}?${params}&page=${page}`,detailFetcher)
}