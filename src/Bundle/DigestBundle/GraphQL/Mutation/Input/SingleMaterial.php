<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Mutation\Input;

use Youshido\GraphQL\Type\InputObject\AbstractInputObjectType;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;

/**
 * Class SingleMaterial
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Mutation\Input
 */
class SingleMaterial extends AbstractInputObjectType
{
    /** {@inheritdoc} */
    public function build($config)
    {
        $config->addFields([
            'url' => new NonNullType(new StringType()),
            'title' => new StringType(),
            'description' => new StringType(),
        ]);
    }
}
