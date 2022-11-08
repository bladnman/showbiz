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
  ShowImage,
  CastCredit,
  Credits,
  CrewCredit,
  ShowImageCollection,
  MovieVideo,
  MovieVideoCollection,
  Person,
  Query,
  OptionsBag,
  TvShow,
  ShowType,
  Show,
  SearchMultiResults,
  ExternalSource,
  FindResults,
} from "./types";
import deepMapKeys from "deep-map-keys";
import extractKey from "./utils/extractKey";

export default class TMDB {
  apiKey: string;
  language: string;

  constructor(apiKey: string, language: string = "en") {
    this.apiKey = apiKey;
    this.language = language;
  }

  //                          _    ___     _       _
  //  ___ ___ ___ ___ ___ ___| |  |  _|___| |_ ___| |_ ___ ___
  // | . | -_|   | -_|  _| .'| |  |  _| -_|  _|  _|   | -_|  _|
  // |_  |___|_|_|___|_| |__,|_|  |_| |___|_| |___|_|_|___|_|
  // |___|
  async get<T>(resource: string, parameters: any): Promise<T> | never {
    let url = `https://api.themoviedb.org/3/${resource}`;
    if (url.indexOf("?") < 0) {
      url += "?";
    }
    url += `&${new URLSearchParams(parameters).toString()}`;
    url += `&api_key=${this.apiKey}`;

    console.log(`🐽 [TMDB] url`, url);

    //  ___     _       _
    // |  _|___| |_ ___| |_
    // |  _| -_|  _|  _|   |
    // |_| |___|_| |___|_|_|
    const srvcResponse = (await fetch(url)) as any;
    const data = await srvcResponse.json();
    const statusCode = srvcResponse.status ?? 500;

    // console.log(`🐽 [TMDB] srvcResponse`, srvcResponse);
    //  ___ ___ ___ ___ ___ ___
    // | -_|  _|  _| . |  _|_ -|
    // |___|_| |_| |___|_| |___|
    if (statusCode > 200) {
      console.log(`🐽 [TMDB] Error: `, url);
    }
    switch (statusCode) {
      case 404:
        throw new NotFoundError();
      case 500:
        throw new RemoteError(data?.status_message, statusCode);

      default:
        break;
    }

    return deepMapKeys(data, camelCase) as T;
  }

  //      _
  //  ___| |_ ___ _ _ _ ___
  // |_ -|   | . | | | |_ -|
  // |___|_|_|___|_____|___|
  async getMovie(id: number | string, options?: OptionsBag): Promise<Movie> {
    const movie = await this.get<Movie>(`movie/${id}`, options);

    return {
      ...movie,

      // Revenue can be 0, e.g. https://gist.github.com/gajus/b396a7e1af22977b0d98f4c63a664d44#file-response-json-L94
      revenue: movie.revenue || null,

      // Runtime can be 0, e.g. https://gist.github.com/gajus/b396a7e1af22977b0d98f4c63a664d44#file-response-json-L95
      runtime: movie.runtime || null,
    };
  }
  async getTvShow(id: number | string, options?: OptionsBag): Promise<TvShow> {
    const tvShow = await this.get<TvShow>(`tv/${id}`, options);
    return tvShow;
  }

  //  _
  // |_|_____ ___ ___ ___ ___
  // | |     | .'| . | -_|_ -|
  // |_|_|_|_|__,|_  |___|___|
  //             |___|
  async getShowImages(
    id: number | string,
    options: OptionsBag & { type: ShowType }
  ): Promise<ShowImageCollection> {
    let image_language_options;

    const type = extractKey("type", options) as ShowType;

    if (options?.includeImageLanguage) {
      options = Object.assign({}, options, {
        include_image_language: options.includeImageLanguage.join(","),
      });
      delete options.includeImageLanguage;
    }
    image_language_options = options?.includeImageLanguage
      ? {
          include_image_language: options.includeImageLanguage.join(","),
        }
      : null;

    const images = await this.get<ShowImageCollection>(
      `${type}/${id}/images`,
      options
    );

    return (
      images ?? {
        backdrops: [],
        posters: [],
        id,
      }
    );
  }
  async getShowPosters(
    id: number | string,
    options: OptionsBag & { type: ShowType }
  ): Promise<ShowImage[]> {
    if (!options || !options.type) {
      return [];
    }
    const images = await this.getShowImages(id, options);
    return images.posters ?? [];
  }
  async getShowBackdrops(
    id: number | string,
    options: OptionsBag & { type: ShowType }
  ): Promise<ShowImage[]> {
    if (!options || !options.type) {
      return [];
    }
    const images = await this.getShowImages(id, options);
    return images.backdrops ?? [];
  }
  async getShowLogos(
    id: number | string,
    options: OptionsBag & { type: ShowType }
  ): Promise<ShowImage[]> {
    if (!options || !options.type) {
      return [];
    }
    const images = await this.getShowImages(id, options);
    return images.logos ?? [];
  }
  async getMovieVideos(movieId: number): Promise<MovieVideo[]> {
    const movieVideoCollection = await this.get<MovieVideoCollection>(
      "movie/" + movieId + "/videos",
      {
        language: this.language,
      }
    );

    return movieVideoCollection.results ?? [];
  }

  //                  _
  //  ___ ___ ___ ___| |___
  // | . | -_| . | . | | -_|
  // |  _|___|___|  _|_|___|
  // |_|         |_|
  async getCastCredits(movieId: number): Promise<CastCredit[]> {
    const Credits = await this.get<Credits>("movie/" + movieId + "/credits", {
      language: this.language,
    });

    return Credits.cast ?? [];
  }
  async getCrewCredits(movieId: number): Promise<CrewCredit[]> {
    const Credits = await this.get<Credits>("movie/" + movieId + "/credits", {
      language: this.language,
    });

    return Credits.crew ?? [];
  }
  async getPerson(personId: number): Promise<Person> {
    const person = await this.get<Person>("person/" + personId, {
      language: this.language,
    });

    return person;
  }
  async getCompany(companyId: number): Promise<Company> {
    const company = await this.get<Company>("company/" + companyId, {
      language: this.language,
    });

    return company;
  }

  //                      _
  //  ___ ___ ___ ___ ___| |_
  // |_ -| -_| .'|  _|  _|   |
  // |___|___|__,|_| |___|_|_|
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
  async search(
    query: string,
    options?: OptionsBag & { type: ShowType }
  ): Promise<Show[]> {
    const type = extractKey("type", options ?? {}) as ShowType | undefined;
    const isValidType = type === "movie" || type === "tv";
    const endpoint = isValidType
      ? `search/${type}?query=${query}`
      : `search/multi?query=${query}`;

    const response = await this.get<SearchMultiResults>(endpoint, options);
    return response?.results ?? [];
  }
  async findShowById(
    id: string,
    options?: OptionsBag & { type: ShowType }
  ): Promise<Show | null> {
    const externalSource = extractKey("externalSource", options ?? {}) as
      | ExternalSource
      | undefined;
    if (!externalSource) return null;
    const endpoint = `find/${id}`;
    const response = await this.get<FindResults>(endpoint, {
      ...options,
      external_source: `${externalSource}_id`,
    });
    const shows = [...response.movieResults, ...response.tvResults];
    return shows.length ? shows[0] : null;
  }
}
