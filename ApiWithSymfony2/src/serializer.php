
/**
 * @Serializer\ExclusionPolicy("all")
 */
class Order
{
    /**
     * @var int
     * @Serializer\Type("integer")
     * @Serializer\Expose
     */
    private $id;

    /**
     * @var Product[]
     * @Serializer\Type("array<Product>")
     * @Serializer\Expose
     */
    private $products;

    /**
     * @var float
     * @Serializer\Type("float")
     * @Serializer\Expose
     */
    private $total;

    // ...
}
