<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Query;

use DS\Digest\Bundle\DigestBundle\GraphQL\Type\MaterialType;
use DS\Digest\Domain\Digest\Model\Material;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\ListType\ListType;
use Youshido\GraphQLBundle\Field\AbstractContainerAwareField;

/**
 * Class MaterialListField
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Query
 */
class MaterialListField extends AbstractContainerAwareField
{
    /** {@inheritdoc} */
    public function getType()
    {
        return new ListType(new MaterialType());
    }

    /** {@inheritdoc} */
    public function build(FieldConfig $config)
    {
        parent::build($config);
    }

    /** {@inheritdoc} */
    public function resolve($value, array $args, ResolveInfo $info)
    {
        $materialRepository = $this->container->get('doctrine_mongodb.odm.document_manager')->getRepository(Material::class);

        return $materialRepository->findAll();
    }
}
