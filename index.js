/**
 *  rss Feed Hook
 *  @author Marc Fiedler
 *  @copyright 2017 Blackout Technologies
 */

// Use Strict mode ECMA Script 5+
"use_strict";

const Hook = require('nexus-hook').Hook;

module.exports = class WeatherHook extends Hook {
    /**
     *  @param {Object} intent Object with .name and .confidence
     *  @param {String} text Original phrasing of the user
     *  @param {Callback} complete Completion callback to continue dialog
     */
    process(text, intent, entities, complete){
        if( intent == "tellMeAbout" ){
            if( this.slots['movie'] != undefined ){
                this.request('GET', 'http://www.omdbapi.com/?apikey=b8212549&t='+this.slots['movie'], {}, (resp) => {
                    if( resp.Response == "True" ){
                        var answer = this.captions.get('movieAnswer');
                        answer = answer.replace('$movie', resp.Title);
                        answer = answer.replace('$year', resp.Year);
                        var imdb = resp.Ratings.find(x => x.Source == 'Internet Movie Database');
                        if( imdb != undefined ){
                            answer = answer.replace('$rating', imdb.Value);
                        }else{
                            answer = answer.replace('$rating', '?');
                        }

                        var ref = undefined;
                        if( resp.Poster != undefined ){
                            this.templateVars = {
                                'movie-poster': resp.Poster,
                                'movie-title': resp.Title
                            }

                            ref = this.generateHyperReferenceFor('poster');
                        }

                        complete({
                            answer: answer,
                            platform: {
                                hyperReferences: [
                                    ref
                                ]
                            }
                        });
                    }else{
                        complete({
                            answer: this.captions.get('fallback'),
                            platform: {}
                        });
                    }
                });
            }else{
                complete({
                    answer: this.captions.get('fallback'),
                    platform: {}
                });
            }
        }

        /*if( cityLookup == "" ){
            complete({
                answer: this.captions.get('fallback'),
                platform: {}
            });
        }else{
            this.request('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+cityLookup+'&units=metric&appid=b482d0ee6286a5bd9babaa1ec1e56e4b', {}, (resp) => {
                var answer = this.captions.get('weatherAnswer');
                answer = answer.replace('$city', cityLookup);
                answer = answer.replace('$temperature', resp.main.temp);
                answer = answer.replace('$weather', resp.weather[0].main);

                complete({
                    answer: answer,
                    platform: {}
                });
            });
        }*/
    }
}