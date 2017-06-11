<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Type;

use Youshido\GraphQL\Type\ListType\ListType;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\StringType;

/**
 * Class SectionType
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Type
 */
class SectionType extends AbstractObjectType
{
    /** {@inheritdoc} */
    public function build($config)
    {
        $config->addFields([
            'name' => new NonNullType(new StringType()),
            'materials' => new ListType(new MaterialType()),
        ]);
    }
}
