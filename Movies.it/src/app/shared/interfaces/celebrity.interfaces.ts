export interface Celebrity {
    id: string;
    name: string;
    birthYear: number;
    deathYear?: number;
    movies?: MovieCelebrity[];
  }
  export interface ResponseDto<T = any> {
    celebrities: T[];
    pagination: {
      currentPage: number;
      pageSize: number;
      totalElements: number;
      totalPages: number;
    };
  }
  
  export interface MovieCelebrity {
    celebrityName: string;
    celebrityId: string;
    movieTitle: string;
    movieId: string;
    category: string;
    characters: string;
  }
  