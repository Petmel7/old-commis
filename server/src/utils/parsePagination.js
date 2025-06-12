const parsePagination = (page, limit) => {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    return { page: pageNum, limit: limitNum };
};

module.exports = parsePagination;
