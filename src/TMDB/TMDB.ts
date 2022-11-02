// import got, { PlainResponse } from "got";
// import { delay } from "bluefeather";
import { camelCase } from "lodash";
import {
  NotFoundError,
  RemoteError,
  Unimplemented,
  UnexpectedResponseError,
} from "./errors";
import {
  APIResponse,
  Company,
  FinditResults,
  Movie,
  MovieBackdropImage,
  MovieCastCredit,
  MovieCredits,
  MovieCrewCredit,
  MoviePosterImage,
  MoviePosterImageCollection,
  MovieVideo,
  MovieVideoCollection,
  Person,
  Query,
  TMDBApi,
} from "../@types/TMDB";
import axios from "axios";
import deepMapKeys from "deep-map-keys";

export default class TMDB implements TMDBApi {
  apiKey: string;
  language: string;

  constructor(apiKey: string, language: string = "en") {
    this.apiKey = apiKey;
    this.language = language;
  }
  async get<T>(resource: string, parameters: Query = {}): Promise<T> {
    let url = "https://api.themoviedb.org/3/" + resource;
    url += `?api_key=${this.apiKey}`;
    url += `&query=${parameters.query}`;
    const headers = {
      responseType: "json",
      searchParams: {
        api_key: this.apiKey,
        ...parameters,
      },
      throwHttpErrors: false,
    };
    console.log(`🐽 parameters`, parameters);

    const response = (await axios({
      url,
      method: "get",
      responseType: "json",
      data: {
        api_key: this.apiKey,
        ...parameters,
      },
    })) as any;

    // console.log(`🐽 response`, response);

    return deepMapKeys(response.data, camelCase) as T;
  }
  async getFetch<T>(resource: string, parameters: Query = {}): Promise<T> {
    const url = "https://api.themoviedb.org/3/" + resource;
    // const headers = {
    //   responseType: "json",
    //   searchParams: {
    //     api_key: this.apiKey,
    //     ...parameters,
    //   },
    //   throwHttpErrors: false,
    // };
    // const response = await fetch(url, { ...(headers as any) });

    const searchParams = {
      api_key: this.apiKey,
    };
    const headers = {
      "Content-Type": "application/json",
      searchParams: {
        api_key: this.apiKey,
      },
    };
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchParams: {
          api_key: this.apiKey,
        },
      }),
    });
    const data = await response.json();
    console.log(`🐽 data`, data);

    return Promise.resolve() as T;
  }

  async getGot<T>(resource: string, parameters: Query = {}): Promise<T> {
    return Promise.resolve() as T;
    // while (true) {
    //   const response = await got<PlainResponse>(
    //     "https://api.themoviedb.org/3/" + resource,
    //     {
    //       responseType: "json",
    //       searchParams: {
    //         api_key: this.apiKey,
    //         ...parameters,
    //       },
    //       throwHttpErrors: false,
    //     }
    //   );
    //   if (!String(response.statusCode).startsWith("2")) {
    //     if (response.headers["x-ratelimit-remaining"]) {
    //       const rateLimitRemaining = Number(
    //         response.headers["x-ratelimit-remaining"]
    //       );
    //       if (!rateLimitRemaining) {
    //         const currentTime = Math.round(new Date().getTime() / 1000);
    //         const rateLimitReset = Number(
    //           response.headers["x-ratelimit-reset"]
    //         );
    //         // The minimum 30 seconds cooldown ensures that in case 'x-ratelimit-reset'
    //         // time is wrong, we don't bombard the TMDb server with requests.
    //         const cooldownTime = Math.max(rateLimitReset - currentTime, 30);
    //         console.log("reached rate limit; waiting %d seconds", cooldownTime);
    //         // await delay(cooldownTime * 1000);
    //         continue;
    //       }
    //     }
    //     if (response.statusCode === 404) {
    //       throw new NotFoundError();
    //     }
    //     throw new RemoteError(
    //       (response.body as any).status_message,
    //       (response.body as any).status_code
    //     );
    //   }
    //   return deepMapKeys(response.body, camelCase) as T;
    // }
  }

  async getMovie(movieId: number): Promise<Movie> {
    const movie = await this.get<Movie>("movie/" + movieId, {
      language: this.language,
    });

    return {
      ...movie,

      // Revenue can be 0, e.g. https://gist.github.com/gajus/b396a7e1af22977b0d98f4c63a664d44#file-response-json-L94
      revenue: movie.revenue || null,

      // Runtime can be 0, e.g. https://gist.github.com/gajus/b396a7e1af22977b0d98f4c63a664d44#file-response-json-L95
      runtime: movie.runtime || null,
    };
  }

  // https://developers.themoviedb.org/3/movies/get-movie-images
  async getMovieBackdropImages(
    movieId: number,
    includeImageLanguage: string[]
  ): Promise<MovieBackdropImage[]> {
    const imageCollection = await this.get<MoviePosterImageCollection>(
      "movie/" + movieId + "/images",
      {
        include_image_language: includeImageLanguage
          ? includeImageLanguage.join(",")
          : null,
        language: this.language,
      }
    );

    return imageCollection.backdrops ?? [];
  }

  // https://developers.themoviedb.org/3/movies/get-movie-credits
  async getMovieCastCredits(movieId: number): Promise<MovieCastCredit[]> {
    const movieCredits = await this.get<MovieCredits>(
      "movie/" + movieId + "/credits",
      {
        language: this.language,
      }
    );

    return movieCredits.cast ?? [];
  }

  // https://developers.themoviedb.org/3/movies/get-movie-credits
  async getMovieCrewCredits(movieId: number): Promise<MovieCrewCredit[]> {
    const movieCredits = await this.get<MovieCredits>(
      "movie/" + movieId + "/credits",
      {
        language: this.language,
      }
    );

    return movieCredits.crew ?? [];
  }

  // https://developers.themoviedb.org/3/movies/get-movie-images
  async getMoviePosterImages(
    movieId: number,
    includeImageLanguage: string[]
  ): Promise<MoviePosterImage[]> {
    const images = await this.get<MoviePosterImageCollection>(
      "movie/" + movieId + "/images",
      {
        include_image_language: includeImageLanguage
          ? includeImageLanguage.join(",")
          : null,
        language: this.language,
      }
    );

    return images.posters ?? [];
  }

  /**
   * Get the videos that have been added to a movie.
   *
   * https://developers.themoviedb.org/3/movies/get-movie-videos
   */
  async getMovieVideos(movieId: number): Promise<MovieVideo[]> {
    const movieVideoCollection = await this.get<MovieVideoCollection>(
      "movie/" + movieId + "/videos",
      {
        language: this.language,
      }
    );

    return movieVideoCollection.results ?? [];
  }

  /**
   * Get the primary person details by id.
   *
   * https://developers.themoviedb.org/3/people/get-person-details
   */
  async getPerson(personId: number): Promise<Person> {
    const person = await this.get<Person>("person/" + personId, {
      language: this.language,
    });

    return person;
  }

  /**
   * Get a companies details by id.
   *
   * https://developers.themoviedb.org/3/companies/get-company-details
   */
  async getCompany(companyId: number): Promise<Company> {
    const company = await this.get<Company>("company/" + companyId, {
      language: this.language,
    });

    return company;
  }

  async findId(
    resourceType: "movie" | "person",
    externalSource: "imdb",
    externalId: string
  ): Promise<number> {
    if (resourceType !== "movie" && resourceType !== "person") {
      throw new Unimplemented();
    }

    if (externalSource !== "imdb") {
      throw new Unimplemented();
    }

    const result = await this.get<FinditResults>("find/" + externalId, {
      external_source: externalSource + "_id",
    });

    let results;

    if (resourceType === "movie") {
      results = result.movieResults ?? [];
    } else if (resourceType === "person") {
      results = result.personResults ?? [];
    } else {
      throw new Error("Unexpected state.");
    }

    if (results.length === 0) {
      throw new NotFoundError();
    }

    if (results.length > 1) {
      throw new UnexpectedResponseError();
    }

    return Number(results[0].id);
  }
}
