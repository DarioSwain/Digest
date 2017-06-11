<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Type;

use Youshido\GraphQL\Type\ListType\ListType;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Object\AbstractObjectType;
use Youshido\GraphQL\Type\Scalar\StringType;

/**
 * Class DigestType
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Type
 */
class DigestType extends AbstractObjectType
{
    /** {@inheritdoc} */
    public function build($config)
    {
        $config->addFields([
            'id' => new NonNullType(new StringType()),
            'name' => new NonNullType(new StringType()),
            'state' => new StringType(),
            'sections' => new ListType(new SectionType()),
        ]);
    }
}
