<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Query;

use DS\Digest\Bundle\DigestBundle\GraphQL\Type\MaterialType;
use DS\Digest\Domain\Digest\Model\Material;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;
use Youshido\GraphQLBundle\Field\AbstractContainerAwareField;

/**
 * Class MaterialField
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Query
 */
class MaterialField extends AbstractContainerAwareField
{
    /** {@inheritdoc} */
    public function getType()
    {
        return new MaterialType();
    }

    /** {@inheritdoc} */
    public function build(FieldConfig $config)
    {
        $config->addArguments([
            'id' => new NonNullType(new StringType()),
        ]);

        parent::build($config);
    }

    /** {@inheritdoc} */
    public function resolve($value, array $args, ResolveInfo $info)
    {
        $materialRepository = $this->container->get('doctrine_mongodb.odm.document_manager')->getRepository(Material::class);

        return $materialRepository->find($args['id']);
    }
}
