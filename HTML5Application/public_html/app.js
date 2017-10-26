var myApp = angular.module("myApp", ["ngRoute", "ngAnimate", "angular-iscroll"]).config(_config);

function _config(iScrollServiceProvider) {
    // Supply a default configuration object, eg:
    iScrollServiceProvider.configureDefaults({
        iScroll: {
            // Passed through to the iScroll library
            scrollbars: true,
            fadeScrollbars: true
        },
        directive: {
            // Interpreted by the directive
            refreshInterval: 500
        }
    });
}
 
myApp.config(function($routeProvider) {
    $routeProvider
    .when("/movies", {
        templateUrl: "partials/movies.html",
        controller: "MainCtrl"
    })
    .when("/series", {
        templateUrl: "partials/series.html",
        controller: "MainCtrl"
    })
    .when("/anime", {
        templateUrl: "partials/anime.html",
        controller: "MainCtrl"
    })
    .when("/favorites", {
        templateUrl: "partials/favorites.html",
        controller: "MainCtrl"
    })
    .when("/watched", {
        templateUrl: "partials/watched.html",
        controller: "MainCtrl"
    })
    .when("/preview", {
        templateUrl: "partials/preview.html",
        controller: "MainCtrl"
    })
    .when("/trailer", {
        templateUrl: "partials/trailer.html",
        controller: "MainCtrl"
    })
    .otherwise({
        redirectTo: "/movies"
    });
});


myApp.factory("mainService", function($sce, $route, $http) {

    var movies = [];
    var series = [];
    var anime = [];
    var moviesUrl = "https://api.myjson.com/bins/ibadt";
    var seriesUrl = "https://api.myjson.com/bins/fw1y9";
    var animeUrl = "https://api.myjson.com/bins/1fk4sx";
    
    var favorites = [];
    var watched = [];
    var preview = [];
    var trailer = [];

    var options = [
        {option: "Default"},
        {option: "A to Z"},
        {option: "Z to A"},
        {option: "Newest"},
        {option: "Oldest"},
        {option: "Best Rated"},
        {option: "Worst Rated"}
    ];

    var genres = [
        {genre: "All"},
        {genre: "Action"},
        {genre: "Adventure"},
        {genre: "Animation"},
        {genre: "Biography"},
        {genre: "Comedy"},
        {genre: "Crime"},
        {genre: "Documentary"},
        {genre: "Drama"},
        {genre: "Family"},
        {genre: "Fantasy"},
        {genre: "Film-Noir"},
        {genre: "History"},
        {genre: "Horror"},
        {genre: "Music"},
        {genre: "Musical"},
        {genre: "Mystery"},
        {genre: "Romance"},
        {genre: "Sci-Fi"},
        {genre: "Sport"},
        {genre: "Thriller"},
        {genre: "War"},
        {genre: "Western"}
    ];

    return {
        getMovies: function() {
            return $http.get(moviesUrl).then( function(response) {
                for(var i=0; i < response.data.length; i++) {
                     response.data[i].videoUrl = $sce.trustAsResourceUrl(response.data[i].videoUrl);
                }
                return movies = response.data;
            });
        },
        getSeries: function() {
            return $http.get(seriesUrl).then( function(response) {
                for(var i=0; i < response.data.length; i++) {
                    response.data[i].videoUrl = $sce.trustAsResourceUrl(response.data[i].videoUrl);
                }
                return series = response.data;
            });
        },
        getAnime: function() {
            return $http.get(animeUrl).then( function(response) {
                for(var i=0; i < response.data.length; i++) {
                    response.data[i].videoUrl = $sce.trustAsResourceUrl(response.data[i].videoUrl);
                }
                return anime = response.data;
            });
        },
        getFavorites: function() {
            return favorites;
        },
        addToFavorites: function(item) {
            if(favorites.indexOf(item) === -1) {
                //add item
                favorites.push(item);
                alert("Item: \"" + item.name + "\" was added to favorites");
            } else {
                alert("Item \"" + item.name + "\" is already in the favorites");
            }
        },
        removeFromFavorites: function(item) {
            var position = favorites.indexOf(item);
            favorites.splice(position, 1);
            alert("Item: \"" + item.name + "\" was removed from favorites");
        },
        getWatched: function() {
            return watched;
        },
        addToWatched: function(item) {
            if(watched.indexOf(item) === -1) {
                watched.push(item);
                alert("Item: \"" + item.name + "\" was added to watched");
            } else {
                alert("Item \"" + item.name + "\" is already in the watched");
            }
        },
        removeFromWatched: function(item) {
            var position = watched.indexOf(item);
            watched.splice(position, 1);
            alert("Item: \"" + item.name + "\" was removed from watched");
        },
        getPreview: function() {
           return preview;
        },
        addToPreview: function(item) {
           preview.push(item);
        },
        removeFromPreview: function() {
            preview = [];
            window.history.back();
        },
        clearPreview: function() {
            preview = [];
        },
        getTrailer: function() {
           return trailer;
        },
        addToTrailer: function(item) {
           trailer.push(item);
        },
        removeFromTrailer: function(item) {
            trailer = [];
            window.history.back();
        },
        clearTrailer: function() {
            trailer = [];
        },
        getGenres: function() {
            return genres;
        },
        getOptions: function() {
            return options;
        },
        search: function(searchItem, type) {
            var searchData = [];
            switch(type) {
                case 'movies':
                    searchData = movies;
                    break;
                case 'series':
                    searchData = series;
                    break;
                case 'anime':
                    searchData = anime;
                    break;
                case 'favorites':
                    searchData = favorites;
                    break;
                case 'watched':
                    searchData = watched;
                    break;
            }
            if(searchItem == "") {
                return searchData;
            } else {
                var searchedData = [];
                for(i = 0; i< searchData.length; i++) {
                    var matchData = searchData[i].name.match(new RegExp(searchItem, "gi"));
                    if(matchData) {
                        searchedData.push(searchData[i]);
                    }
                }
            }
            return searchedData;
        },
        sort: function(sortItem, type) {
            console.log(sortItem, type);
            var sortData = [];
            switch(type) {
                case 'movies':
                    sortData = movies;
                    break;
                case 'series':
                    sortData = series;
                    break;
                case 'anime':
                    sortData = anime;
                    break;
                case 'favorites':
                    sortData = favorites;
                    break;
                case 'watched':
                    sortData = watched;
                    break;
            }
            if(sortItem == "Default") {
                return sortData;
            } else {
                var sortedData = [];                
                switch(sortItem) {
                    case 'A to Z':
                        sortedData = sortData.sort(function(a, b) {
                            return a.name.localeCompare(b.name);
                        });
                        break;
                    case 'Z to A':
                        sortedData = sortData.sort(function(a, b) {
                            return b.name.localeCompare(a.name);
                        });
                        break;
                    case 'Newest':
                        sortedData = sortData.sort(function(a, b) {
                            return parseFloat(b.year) - parseFloat(a.year);
                        });
                        break;
                    case 'Oldest':
                        sortedData = sortData.sort(function(a, b) {
                            return parseFloat(a.year) - parseFloat(b.year);
                        });
                        break;
                    case 'Best Rated':
                        sortedData = sortData.sort(function(a, b) {
                            return parseFloat(b.rating) - parseFloat(a.rating);
                        });
                        break;
                    case 'Worst Rated':
                        sortedData = sortData.sort(function(a, b) {
                            return parseFloat(a.rating) - parseFloat(b.rating);
                        });
                        break;
                }
                return sortedData;
            }
        },
        filter: function(filterItem, type) {
            console.log(filterItem, type);
            var filterData = [];
            switch(type) {
                case 'movies':
                    filterData = movies;
                    break;
                case 'series':
                    filterData = series;
                    break;
                case 'anime':
                    filterData = anime;
                    break;
                case 'favorites':
                    filterData = favorites;
                    break;
                case 'watched':
                    filterData = watched;
                    break;
            }
            if(filterItem == "All") {
                return filterData;
            } else {
                var filteredData = [];
                for(i = 0; i< filterData.length; i++) {
                    var matchData = filterData[i].genre.match(new RegExp(filterItem, "gi"));
                    if(matchData) {
                        filteredData.push(filterData[i]);
                    }
                }
            }
            return filteredData;
        }
    }

});

myApp.factory("focusService", function($timeout, $window) {
    return {
        focusInput: function(id) {
            // timeout makes sure that it is invoked after any other event has been triggered.
            // e.g. click events that need to run before the focus or
            // inputs elements that are in a disabled state but are enabled when those events
            // are triggered.
            $timeout(function() {
                var element = $window.document.getElementById(id);
                if(element) {
                  element.focus();
                }
            });
        }
    }
});

myApp.controller("BodyCtrl", function($rootScope, $scope, iScrollService){
    //Closing dropdowns and inputs
    $scope.closeAllFields = function() {
        $rootScope.$broadcast('closeAllFields');
    }
    //Icroll related
    var vm = this;
    vm.iScrollState = iScrollService.state;
});


myApp.controller("HeaderCtrl", function($rootScope, $scope, $location, $route, mainService, focusService) {

    $scope.genres = mainService.getGenres();
    $scope.options = mainService.getOptions();
    
    $scope.appDetails = {};
    $scope.appDetails.title = "MovieStash";
    $scope.appDetails.currentGenre = "All";
    $scope.appDetails.currentType = "Default";

    //Main nav classes
    $scope.nav = {};
    $scope.nav.isActive = function (path) {
        if (path === $location.path()) {
            return true;
        }
        return false;
    };

    //Genre nav classes
    $scope.gen = {};
    $scope.gen.isActive = function(itemGenre) {
        //console.log(itemGenre, $scope.appDetails.currentGenre);
        if(itemGenre === $scope.appDetails.currentGenre) {
            return true;
        }
        return false;
    }

    //Sort nav classes
    $scope.srt = {};
    $scope.srt.isActive = function(sortType) {
        //console.log(sortType, $scope.appDetails.currentType);
        if(sortType === $scope.appDetails.currentType) {
            return true;
        }
        return false;
    }


    $scope.filter = function (newValue) {
        
        $scope.appDetails.currentGenre = newValue;

        switch($route.current.$$route.originalPath) {

            case '/movies':
                var movies = mainService.filter(newValue, 'movies');
                $rootScope.$emit('refreshMovies', movies);
                break;
            case '/series':
                var series = mainService.filter(newValue, 'series');
                $rootScope.$emit('refreshSeries', series);
                break;
            case '/anime':
                var anime = mainService.filter(newValue, 'anime');
                $rootScope.$emit('refreshAnime', anime);
                break;
            case '/favorites':
                var favorites = mainService.filter(newValue, 'favorites');
                $rootScope.$emit('refreshFavorites', favorites);
                break;
            case '/watched':
                var watched = mainService.filter(newValue, 'watched');
                $rootScope.$emit('refreshWatched', watched);
                break;
            case '/preview':
                mainService.clearPreview();
                window.history.back();

                break;
            case '/trailer':
                mainService.clearTrailer();
                window.history.back();
                window.history.back();

                break;

        } //end switch statement;

    } //end filter function;

    

    $scope.sort = function(newValue) {

        $scope.appDetails.currentType = newValue;

        switch($route.current.$$route.originalPath) {

            case '/movies':
                var movies = mainService.sort(newValue, 'movies');
                $rootScope.$emit('refreshMovies', movies);
                break;
            case '/series':
                var series = mainService.sort(newValue, 'series');
                $rootScope.$emit('refreshSeries', series);
                break;
            case '/anime':
                var anime = mainService.sort(newValue, 'anime');
                $rootScope.$emit('refreshAnime', anime);
                break;
            case '/favorites':
                var favorites = mainService.sort(newValue, 'favorites');
                $rootScope.$emit('refreshFavorites', favorites);
                break;
            case '/watched':
                var watched = mainService.sort(newValue, 'watched');
                $rootScope.$emit('refreshWatched', watched);
                break;
            case '/preview':
                mainService.clearPreview();
                window.history.back();

                break;
            case '/trailer':
                mainService.clearTrailer();
                window.history.back();
                window.history.back();

                break;

        } //end switch statement;

    } //end sort function;


    //Clear partial views
    $scope.clearPreview = function() {
        mainService.clearPreview();
    };
    $scope.clearTrailer = function() {
        mainService.clearTrailer();
    };
    $scope.clearFilter = function() {
        $scope.appDetails.currentGenre = "All";
    };
    $scope.clearSort = function() {
        $scope.appDetails.currentType = "Default";
    };

    //Clear everything
    $scope.clearAll = function() {
        mainService.clearPreview();
        mainService.clearTrailer();
        $scope.appDetails.currentGenre = "All";
        $scope.appDetails.currentType = "Default";
    }

    //Search views
    $scope.$watch('searchItems', function trackSearch(newValue, oldValue){

        if(newValue || newValue == "") {
            switch($route.current.$$route.originalPath) {

                case '/movies':
                    var movies = mainService.search(newValue, 'movies');
                    $rootScope.$emit('refreshMovies', movies);
                    break;
                case '/series':
                    var series = mainService.search(newValue, 'series');
                    $rootScope.$emit('refreshSeries', series);
                    break;
                case '/anime':
                    var anime = mainService.search(newValue, 'anime');
                    $rootScope.$emit('refreshAnime', anime);
                    break;
                case '/favorites':
                    var favorites = mainService.search(newValue, 'favorites');
                    $rootScope.$emit('refreshFavorites', favorites);
                    break;
                case '/watched':
                    var watched = mainService.search(newValue, 'watched');
                    $rootScope.$emit('refreshWatched', watched);
                    break;
                case '/preview':
                    mainService.clearPreview();
                    window.history.back();
                    trackSearch();
                    break;
                case '/trailer':
                    mainService.clearTrailer();
                    window.history.back();
                    window.history.back();
                    trackSearch();
                    break;

            } //end switch statement;

        } //end if statement;

    });  //end search

    //Focus input on search
    $scope.focusInput = function() {
      // do something awesome
      focusService.focusInput("searchbox");
    };

    //Show & Hide dropdowns & inputs
    $scope.showGenreFunc = function() {
        $scope.showGenre = !$scope.showGenre;
        $scope.showSortby = false;
        $scope.showSearchbox = false;
    }
    $scope.showSortByFunc = function() {
        $scope.showSortby = !$scope.showSortby;
        $scope.showGenre = false;
        $scope.showSearchbox = false;
    }
    $scope.showSearchboxFunc = function() {
        $scope.showSearchbox = !$scope.showSearchbox;
        $scope.showSortby = false;
        $scope.showGenre = false;
    }

    //Close all fields
    $scope.closeAll = function() {
        if($scope.showSortby) {
            $scope.showSortByFunc();
        }
        if($scope.showGenre) {
            $scope.showGenreFunc();
        }
        if($scope.showSearchbox) {
            $scope.showSearchboxFunc();
        }
    }

    //Close all click when clicked on anything else
    $scope.$on("closeAllFields", function(){
        $scope.closeAll();
    })

});

myApp.controller("MainCtrl", function($rootScope, $scope, $location, mainService) {

    //Get data from mainService
    // Get movies
    var moviesPromise = mainService.getMovies();
    moviesPromise.then(function(result){
        $scope.movies = result;
    });
    // Get series
    var seriesPromise = mainService.getSeries();
    seriesPromise.then(function(result){
        $scope.series = result;
    });
    // Get anime
    var animePromise = mainService.getAnime();
    animePromise.then(function(result){
        $scope.anime = result;
    });

    $scope.favorites = mainService.getFavorites();
    $scope.watched = mainService.getWatched();
    $scope.preview = mainService.getPreview();
    $scope.trailer = mainService.getTrailer();

    //Get data after search
    $rootScope.$on("refreshMovies", function(event, args) {
      $scope.movies = args;
    });
    $rootScope.$on("refreshSeries", function(event, args) {
      $scope.series = args;
    });
    $rootScope.$on("refreshAnime", function(event, args) {
      $scope.anime = args;
    });
    $rootScope.$on("refreshFavorites", function(event, args) {
      $scope.favorites = args;
    });
    $rootScope.$on("refreshWatched", function(event, args) {
      $scope.watched = args;
    });
    //Done this with clear partial views funciotns
    /*$rootScope.$on("refreshPreview", function(event, args) {
      $scope.preview = args;
    });
    $rootScope.$on("refreshTrailer", function(event, args) {
      $scope.trailer = args;
    });*/

    //Add to or Remove from favorites
    $scope.addToFavorites = function(item) {
        mainService.addToFavorites(item);
    };
    $scope.removeFromFavorites = function(item) {
        mainService.removeFromFavorites(item);
    };

    //Add to or Remove from watched
    $scope.addToWatched = function(item) {
        mainService.addToWatched(item);
    };
    $scope.removeFromWatched = function(item) {
        mainService.removeFromWatched(item);
    };

    //Add to or Remove from preview + go to /preview
    $scope.addToPreview = function(item) {
        mainService.addToPreview(item);
    };
    $scope.removeFromPreview = function() {
        mainService.removeFromPreview();
    };
    $scope.goToPreview = function (hash) {
        $location.path(hash);
    }

    //Add to or Remove from trailer
    $scope.addToTrailer = function(item) {
        mainService.addToTrailer(item);
    };
    $scope.removeFromTrailer = function() {
      mainService.removeFromTrailer();
    };

    //Watched item classes
    $scope.wtc = {};
    $scope.wtc.isActive = function(itemWatched) {
        if($scope.watched.indexOf(itemWatched) != -1) {
            return true;
        }
        return false;
    }

    //Favorites item classes
    $scope.fav = {};
    $scope.fav.isActive = function(itemWatched) {
        if($scope.favorites.indexOf(itemWatched) != -1) {
            return true;
        }
        return false;
    }

});