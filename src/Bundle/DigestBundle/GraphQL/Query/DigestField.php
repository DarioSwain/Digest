<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Query;

use DS\Digest\Bundle\DigestBundle\GraphQL\Type\DigestType;
use DS\Digest\Domain\Digest\Model\Digest;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;
use Youshido\GraphQLBundle\Field\AbstractContainerAwareField;

/**
 * Class DigestField
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Query
 */
class DigestField extends AbstractContainerAwareField
{
    /** {@inheritdoc} */
    public function getType()
    {
        return new DigestType();
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
        $digestRepository = $this->container->get('doctrine_mongodb.odm.document_manager')->getRepository(Digest::class);

        return $digestRepository->find($args['id']);
    }
}
