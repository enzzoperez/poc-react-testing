import React from 'react'
import {render, screen, cleanup} from '@testing-library/react';
import { fetchPost as mockFetchPost} from "./api";
import user from '@testing-library/user-event';
import Home from './Home';
import App from './App';
import Post from './Post';

jest.mock('./api')

describe('Home Page', ()=>{
    afterEach(cleanup)

    it('palabras obligadas welcome, search, id', ()=>{
        render(<Home />)
        expect(screen.getByText(/search.*id/i)).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled()
    })

    test('Post ID', async () => {
        const mockPost = {
            id: "33",
            title: "Post mock Title",
            body: "Post mock Body",
        };

        mockFetchPost.mockResolvedValueOnce(mockPost)
        render(<App />)

        const submitButton = screen.getByRole('button', {name: 'Submit'})
        expect(submitButton).toBeDisabled()

        user.type(screen.getByPlaceholderText('ingrese', {exact: false}), mockPost.id)
        expect(submitButton).toBeEnabled()

        user.click(submitButton)
        await screen.findByText('loading', {exact: false});

        expect(mockFetchPost).toHaveBeenCalledWith(mockPost.id);
        expect(mockFetchPost).toHaveBeenCalledTimes(1);
        expect(screen.getByText(mockPost.title)).toBeInTheDocument();
        expect(screen.getByText(mockPost.body)).toBeInTheDocument();

        user.click(screen.getByText('Back', {exact: false}))
        expect(screen.getByText('welcome', {exact: false})).toBeInTheDocument()
    })
})