const renderOrderItem = (product, item, seller) => {
    return `
        <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px;"><strong>Фото:</strong></td>
            <td style="padding: 10px;"><img src="${product.images[0]}" alt="${product.name}" width="70" style="border-radius: 4px;"/></td>
        </tr>
        <tr>
            <td style="padding: 10px;"><strong>Назва товару:</strong></td>
            <td style="padding: 10px;">${product.name}</td>
        </tr>
        <tr>
            <td style="padding: 10px;"><strong>Кількість:</strong></td>
            <td style="padding: 10px;">${item.quantity}</td>
        </tr>
        <tr>
            <td style="padding: 10px;"><strong>Ціна:</strong></td>
            <td style="padding: 10px;">${product.price}</td>
        </tr>
        <tr>
            <td style="padding: 10px;"><strong>Продавець:</strong></td>
            <td style="padding: 10px;">${seller.name} ${seller.last_name}</td>
        </tr>
        <tr><td colspan="2" style="height:20px;"></td></tr>
    `;
}

module.exports = renderOrderItem;
