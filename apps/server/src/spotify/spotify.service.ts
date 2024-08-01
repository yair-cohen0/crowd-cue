import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ISpotifyArtist } from './spotify.types';

@Injectable()
export class SpotifyService {
    constructor(private readonly configService: ConfigService) {}

    private token: string;

    private async generateToken() {
        const clientId = this.configService.get<string>('spotify.clientId');
        const clientSecret = this.configService.get<string>('spotify.clientSecret');

        try {
            const token = (
                await axios.post(
                    'https://accounts.spotify.com/api/token',
                    {
                        grant_type: 'client_credentials',
                    },
                    {
                        headers: {
                            Authorization: `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    },
                )
            ).data.access_token;

            if (!token) {
                throw Error('No token provided');
            }

            this.token = token;
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }

    public async findByName(name: string, skip: number = 0, limit: number = null): Promise<ISpotifyArtist[]> {
        if (!this.token) {
            await this.generateToken();
        }

        try {
            const data = (
                await axios.get('https://api.spotify.com/v1/search', {
                    params: {
                        q: name,
                        type: 'artist',
                        limit,
                        offset: skip,
                    },
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
            ).data;
            return data.artists.items as ISpotifyArtist[];
        } catch (error) {
            throw new HttpException(error.message, 500);
        }
    }
}
