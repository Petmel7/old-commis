// const paginate = async (model, {
//     page = 1,
//     limit = 10,
//     where = {},
//     include = [],
//     order = [['created_at', 'DESC']],
// }) => {
//     const offset = (page - 1) * limit;

//     const { count, rows } = await model.findAndCountAll({
//         where,
//         include,
//         limit,
//         offset,
//         order,
//     });

//     return {
//         data: rows,
//         totalPages: Math.ceil(count / limit),
//         currentPage: page,
//     };
// };

// module.exports = paginate;


const paginate = async (model, {
    page = 1,
    limit = 10,
    where = {},
    include = [],
    order = [],
}) => {

    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await model.findAndCountAll({
            where,
            include,
            limit,
            offset,
            order,
        });

        return {
            data: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        };
    } catch (err) {
        console.error('🔥 paginate error:', err);
        throw err;
    }
};

module.exports = paginate;
