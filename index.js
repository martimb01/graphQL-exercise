import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//db
import db from './_db.js';

//types
import { typeDefs } from "./schema.js";

const resolvers = {
    Query: {
        games() {
            return db.games;
        },
        game(parent,args,context) {
            return db.games.find((game) => {
                return game.id === args.id
            })
        },
        reviews() {
            return db.reviews;
        },
        review(parent, args, context) {
            return db.reviews.find((review) => {
                return review.id === args.id 
            })
        },
        authors() {
            return db.authors;
        },
        author(parent,args, context) {
            return db.authors.find((author) => {
                return author.id === args.id;
            })
        }

    },
    Game: {
        reviews (parent) {
            return db.reviews.filter((review) => {
                return review.game_id === parent.id;
            })
        }
    },
    Author: {
        reviews (parent) {
            return db.reviews.filter((review) => {
                return review.author_id === parent.id;
            })
        }
    },
    Review: {
        author (parent) {
            return db.authors.find((author) => {
                return author.id === parent.author_id;
            })
        },
        game (parent) {
            return db.games.find((game) => {
                return game.id === parent.game_id;
            })
        }
    }
}

//server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const {url} = await startStandaloneServer(server, {
    listen: { port:4000 }
});

console.log('Server ready at port', 4000);
