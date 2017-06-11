<?php

namespace DS\Digest\Bundle\DigestBundle\GraphQL\Mutation;

use DS\Digest\Bundle\DigestBundle\GraphQL\Type\DigestType;
use DS\Digest\Domain\Digest\Model\Digest;
use Youshido\GraphQL\Config\Field\FieldConfig;
use Youshido\GraphQL\Execution\ResolveInfo;
use Youshido\GraphQL\Type\NonNullType;
use Youshido\GraphQL\Type\Scalar\StringType;
use Youshido\GraphQLBundle\Field\AbstractContainerAwareField;

/**
 * Class CreateDigestField
 * @package DS\Digest\Bundle\DigestBundle\GraphQL\Mutation
 */
class CreateDigestField extends AbstractContainerAwareField
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
            'name' => new NonNullType(new StringType()),
        ]);

        parent::build($config);
    }

    /** {@inheritdoc} */
    public function resolve($value, array $args, ResolveInfo $info)
    {
        $digest = new Digest($args['name']);

        $documentManager = $this->container->get('doctrine_mongodb.odm.document_manager');
        $documentManager->persist($digest);
        $documentManager->flush($digest);

        return $digest;
    }
}
