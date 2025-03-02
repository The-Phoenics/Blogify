import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Blog from '@models/blog.model';
import Comment from '@models/comment.model';
import Tag from '@models/tag.model';
import User from '@models/user.model';
import { connectDB } from './db/db';

const generateUsers = async (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(new User({
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            emailVerified: faker.datatype.boolean(),
            joinDate: faker.date.past(),
        }));
    }
    return User.insertMany(users);
};

const generateTags = async (count) => {
    const tags = [];
    for (let i = 0; i < count; i++) {
        tags.push(new Tag({ tag: faker.word.noun() }));
    }
    return Tag.insertMany(tags);
};

const generateBlogs = async (users, tags, count) => {
    const blogs = [];
    for (let i = 0; i < count; i++) {
        blogs.push(new Blog({
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(5),
            author: faker.helpers.arrayElement(users)._id,
            tags: faker.helpers.arrayElements(tags.map(tag => tag._id), faker.number.int({ min: 1, max: 3 })),
            date: faker.date.past(),
            lastUpdated: faker.date.recent(),
            public: faker.datatype.boolean(),
            published: faker.datatype.boolean(),
            image: faker.image.urlLoremFlickr(),
        }));
    }
    return Blog.insertMany(blogs);
};

const generateComments = async (users, blogs, count) => {
    const comments = [];
    for (let i = 0; i < count; i++) {
        comments.push(new Comment({
            blogId: faker.helpers.arrayElement(blogs)._id,
            userId: faker.helpers.arrayElement(users)._id,
            content: faker.lorem.sentences(2),
            date: faker.date.recent(),
        }));
    }
    return Comment.insertMany(comments);
};

const seedDatabase = async () => {
    await connectDB(async () => {
        try {
            await mongoose.connection.dropDatabase();
            console.log('Database cleared.');

            const users = await generateUsers(5);
            console.log('Users created.');

            const tags = await generateTags(5);
            console.log('Tags created.');

            const blogs = await generateBlogs(users, tags, 10);
            console.log('Blogs created.');

            await generateComments(users, blogs, 20);
            console.log('Comments created.');

            console.log('Database seeding complete.');
            mongoose.connection.close();
        } catch (error) {
            console.error(error);
            mongoose.connection.close();
        }
    })
};

seedDatabase()