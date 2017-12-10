<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Type;

use Youshido\GraphQL\Type\ListType\ListType;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\StringType;

/**
 * Class MaterialType
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Mutation
 */
class MaterialType extends AbstractObjectType
{
    /** {@inheritdoc} */
    public function build($config)
    {
        $config->addFields([
            'id' => new NonNullType(new StringType()),
            'url' => new NonNullType(new StringType()),
            'title' => new StringType(),
            'description' => new StringType(),
            'proposedBy' => new StringType(),
            'language' => new StringType(),
            'tags' => new ListType(new StringType()),
        ]);
    }
}
