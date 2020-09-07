const express = require('express');
const router = express.Router();
const axios = require('axios');
const {BASE_URL, RECENT_POSTS, TOP_TAGS, MORE_POSTS, BY_SLUG} = require('../constant');

function formatResponse(posts) {
    let result = [];
    (posts || []).map(post => {
        if (post) {
            result.push({
                id: post.ID,
                author: post.author || {},
                postThumbnail: post.post_thumbnail || {},
                title: post.title,
                categories: post.categories || {},
                tags: post.tags || {},
                excerpt: post.excerpt || "",
                slug: post.slug,
                content: post.content,
                date: post.date
            })
        }
    });
    return result;
}

router.get('/', async (req, res, next) => {
    try {
        const {tag, category, page_handle} = req.query;
        const TAG = tag ? `&tag=${tag}` : "";
        const CATEGORY = category ? `&category=${category}` : "";
        const POST_TYPE = page_handle ? MORE_POSTS : RECENT_POSTS;
        const response = await Promise.all([
            axios.get(BASE_URL + POST_TYPE + `${encodeURIComponent(page_handle || '')}` + TAG + CATEGORY),
            axios.get(BASE_URL + TOP_TAGS)
        ]);
        const nextPageUrl = response[0].data.meta.next_page;
        const topTags = response[1].data.tags.map(tag => ({
            id: tag.ID,
            slug: tag.slug,
            name: tag.name
        }));
        const filteredData = formatResponse(response[0].data.posts)
        return res.status(200).json({
            items: filteredData,
            topTags,
            nextPageUrl
        });
    } catch (error) {
        return next(error);
    }
});

router.get('/related/:blogId', async (req, res, next) => {
    try {
        const response = await axios.post(BASE_URL + `posts/${req.params.blogId}/related`, {
            size: 3
        });
        const pList = response.data.hits.map(hit => new Promise(async (resolve, reject) => {
            try {
                const resp = await axios.get(BASE_URL + `posts/${hit.fields.post_id}`);
                const post = resp.data;
                resolve({
                    id: post.ID,
                    postThumbnail: post.post_thumbnail,
                    title: post.title,
                    slug: post.slug,
                    date: post.date,
                    author: post.author
                });
            } catch (error) {
                reject(error);
            }
        }));
        const relatedPosts = await Promise.all(pList);
        return res.status(200).json(relatedPosts);
    } catch (error) {
        return next(error);
    }
});

router.get('/slug/:slug', async (req, res, next) => {
    try {
        const resp = await Promise.all([
            axios.get(BASE_URL + BY_SLUG + req.params.slug),
            axios.get(BASE_URL + TOP_TAGS)
        ])
        const topTags = resp[1].data.tags.map(tag => ({
            id: tag.ID,
            slug: tag.slug,
            name: tag.name
        }));
        return res.status(200).json({
            items: formatResponse([resp[0].data]),
            topTags
        });
    } catch (error) {
        return res.status(200).json({});
    }
});

module.exports = router;