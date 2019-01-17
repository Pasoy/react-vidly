import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';

import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .label('Title')
            .required(),
        genreId: Joi.string()
            .label('Genre')
            .required(),
        numberInStock: Joi.number()
            .label('Number in Stock')
            .min(0)
            .max(100)
            .required(),
        dailyRentalRate: Joi.number()
            .label('Daily Rental Rate')
            .min(0)
            .max(20)
            .required()
    };

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            const movieId = this.props.match.params.id;
            if (movieId === 'new') {
                return;
            }

            const { data: movie } = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                this.props.history.replace('/404');
            }
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genreId,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = async () => {
        await saveMovie(this.state.data);

        this.props.history.push('/movies');
    };

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput(
                        'numberInStock',
                        'Number in Stock',
                        'number'
                    )}
                    {this.renderInput('dailyRentalRate', 'Rate')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default MovieForm;
